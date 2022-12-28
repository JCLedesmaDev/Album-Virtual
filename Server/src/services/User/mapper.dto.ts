const single = (resource, authUser) => ({
    id: resource._id,
    username: resource.username,
    email: resource.email,
});

const multiple = (resources, authUser) => resources.map((resource) => single(resource, authUser));

export {
    single,
    multiple,
};