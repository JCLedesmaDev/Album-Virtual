"use strict";
const single = (resource, authUser) => ({
    id: resource._id,
    username: resource.username,
    email: resource.email,
});
const multiple = (resources, authUser) => resources.map((resource) => single(resource, authUser));
module.exports = {
    single,
    multiple,
};
//# sourceMappingURL=mapper.dto.js.map