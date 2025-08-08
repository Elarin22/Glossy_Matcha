declare module "dom-to-image-more" {
    interface Options {
        cacheBust?: boolean;
        bgcolor?: string | null;
    }

    function toPng(node: Node, options?: Options): Promise<string>;
    function toJpeg(node: Node, options?: Options): Promise<string>;
    function toSvg(node: Node, options?: Options): Promise<string>;
    function toBlob(node: Node, options?: Options): Promise<Blob>;

    const domtoimage: {
        toPng: typeof toPng;
        toJpeg: typeof toJpeg;
        toSvg: typeof toSvg;
        toBlob: typeof toBlob;
    };

    export default domtoimage;
}
