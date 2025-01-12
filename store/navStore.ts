// import { getSettings, updateSetting } from "@/utils/helpers/api";
import { defineStore } from "pinia";
import type { NavStore } from "~/types";


// defineStore<'uploadStore', UploadStore, UploadStoreGetters, UploadStoreActions>('uploadStore', {
export const useNavStore = defineStore<'navStore', NavStore>({
    id: 'navStore',
    state: () => ({
        links: [] as string[],
        currentLinkIndex: 0,
        editorDrawerOpen: false
    })
});