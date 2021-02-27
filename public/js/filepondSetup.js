FilePond.registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
	FilePondPluginFileEncode
);
FilePond.parse(document.body);

FilePond.setOptions({
	imageResizeTargetWidth: 640,
	imageResizeTargetHeight: 360,
});
