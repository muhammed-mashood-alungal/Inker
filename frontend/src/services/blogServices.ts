import { axiosInstance } from "@/config/axios";
import { Blog } from "@/types";

export const blogService = {
  createBlog: async (blogData: {
    title: string;
    content: string;
    tags: string[];
    thumbnail?: string;
  }) => {
    const response = await axiosInstance.post<{ status: number; message: string }>(
      "/api/blog",
      blogData
    );
    return response.data;
  },

  deleteBlog: async ({ blogId, authorId }: { blogId: string; authorId: string }) => {
    const response = await axiosInstance.delete<{ status: number; message: string }>(
      `/api/blog/${blogId}`,
      {
        params: { authorId },
      }
    );
    return response.data;
  },

  editBlog: async (
    blogId: string,
    blogData: { title: string; content: string; tags: string[]; thumbnail?: string }
  ) => {
    const response = await axiosInstance.put<{ status: number; message: string }>(
      `/api/blog/${blogId}`,
      blogData
    );
    return response.data;
  },

  archiveBlog: async (
    blogId: string,
    action: boolean
  ) => {
    const response = await axiosInstance.patch<{ status: number; message: string }>(
      `/api/blog/${blogId}/archive`,
      { action }
    );
    return response.data;
  },

  getAllBlogs: async (page: number) => {
    const response = await axiosInstance.get<{ blogs: Blog[]; totalPages: number }>(
      "/api/blog",
      {
        params: {
          page,
        },
      }
    );
    return response.data;
  },


  getBlogById: async (blogId: string) => {
    const response = await axiosInstance.get<Blog>(`/api/blog/${blogId}`);
    return response.data;
  },

  getBlogsByAuthorName: async (
    authorName: string,
    page: number
  ): Promise<{ blogs: Blog[]; totalPages: number }> => {
    const response = await axiosInstance.get<{ blogs: Blog[]; totalPages: number }>(
      `/api/blog/user/${authorName}`,
      {
        params: {
          page,
        },
      }
    );
    return response.data;
  },

  getArchivedBlogs: async (
    page: number
  ): Promise<{ archivedBlogs: Blog[]; totalPages: number }> => {
    const response = await axiosInstance.get<{ archivedBlogs: Blog[]; totalPages: number }>(
      `/api/blog/user/archived`,
      {
        params: {
          page,
        },
      }
    );
    return response.data;
  },

  getBlogsByAuthorId: async (
    authorId: string,
    page: number
  ): Promise<{ blogs: Blog[]; totalPages: number }> => {
    const response = await axiosInstance.get<{ blogs: Blog[]; totalPages: number }>(
      `/api/blog/user/${authorId}`,
      {
        params: {
          page,
        },
      }
    );
    return response.data;
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axiosInstance.post<{ url: string }>(
      "/api/blog/upload-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.url;
  },
};
