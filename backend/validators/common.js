const OBJECT_ID = /^[a-f\d]{24}$/i;
const isObjectId = (value) => typeof value === "string" && OBJECT_ID.test(value);

module.exports = { isObjectId };