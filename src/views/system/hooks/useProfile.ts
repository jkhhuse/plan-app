import { getPictureLinkAction, getProfileAction } from "@/action/profile";
import { HttpMessage } from "@/types";
import { Profile } from "@/types/profile";
import { onMounted, ref } from "@vue/runtime-dom";

export default function useProfile(): any {
  const profile = ref<Profile>({
    name: "",
    bornTime: "",
    origin: 0,
    createTime: "",
    addr: "",
    email: "",
    passwd: "",
    pictureLink: "",
  });

  const fetchProfile = () => {
    getProfileAction().subscribe((res: HttpMessage<Profile>) => {
      profile.value = res.data;
    });
  };

  const fetchPictureLink = () => {
    getPictureLinkAction().subscribe((res: HttpMessage<string>) => {
      if (res.code === "200") {
        profile.value.pictureLink = res.data;
      }
    });
  };

  onMounted(() => {
    fetchProfile();
  });

  return {
    profile,
    fetchPictureLink,
  };
}
