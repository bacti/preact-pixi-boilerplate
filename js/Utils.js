export default
{
    GetArrayBuffer(url, success, error)
    {
        resource.load_buffer(url, response => { success && success(response) }, error)
    },
}
