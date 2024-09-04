import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";

const useGetAllPost = () => {
  const dispatch = useDispatch();  

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/user/post/get_allposts",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          console.log(res.data);
          dispatch(setPosts(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPosts();
  }, [dispatch]);
};

export default useGetAllPost;
