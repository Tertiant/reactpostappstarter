// This is just an example store with fake data
const PostStore = (set, get) => ({
  postLoading: false,
  togglePostLoading: () => set({ postLoading: !postLoading }),
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});

export default PostStore;
