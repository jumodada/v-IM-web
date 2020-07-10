import {faceUtils} from "./emoticon"

export function transform(content:any) {
    // 支持的html标签
    let html = function (end:any) {
        return new RegExp(
            "\\n*\\[" +
            (end || "") +
            "(code|pre|div|span|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)]\\n*",
            "g"
        );
    };
    let fa = faceUtils.faces()
    if (content) {
        content = content
            .replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&#39;")
            .replace(/"/g, "&quot;") // XSS
            .replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2')

            .replace(/face\[([^\s\\[\]]+?)]/g, function(face:any) {
                // 转义表情
                let alt = face.replace(/^face/g, "");
                return (
                    '<img alt="' +
                    fa[alt] +
                    '" title="' +
                    fa[alt] +
                    '" src="' +
                    fa[alt] +
                    '">'
                );
            })
            .replace(/img\[([^\s]+?)]/g, function(img:any) {
                // 转义图片
                let href = img.replace(/(^img\[)|(]$)/g, "");
                return (
                    '<img class="message-img" src="' + href + '" alt="消息图片不能加载">'
                );
            })
            .replace(/file\([\s\S]+?\)\[[\s\S]*?]/g, function(str:string) {
                // 转义文件
                let href = (str.match(/file\(([\s\S]+?)\)\[/) || [])[1];
                let text = (str.match(/\)\[([\s\S]*?)]/) || [])[1];
                if (!href) return str;
                return (
                    '<a class="message-file" href="' +
                    href +
                    '"><i class="ivu-icon ivu-icon-md-arrow-down"></i>' +
                    (text || href) +
                    "</a>"
                );
            })
            .replace(/audio\[([^\s]+?)]/g, function(audio:any) {
                // 转义音频
                return (
                    '<div class="message-audio" data-src="' +
                    audio.replace(/(^audio\[)|(]$)/g, "") +
                    '"><i class="layui-icon">&#xe652;</i><p>音频消息</p></div>'
                );
            })
            .replace(/video\[([^\s]+?)]/g, function(video:any) {
                // 转义音频
                return (
                    '<div class="message-video"  data-src="' +
                    video.replace(/(^video\[)|(]$)/g, "") +
                    '"><i class="layui-icon">&#xe652;</i></div>'
                );
            })
            .replace(/a\([\s\S]+?\)\[[\s\S]*?]/g, function(str:string) {
                // 转义链接
                let href = (str.match(/a\(([\s\S]+?)\)\[/) || [])[1];
                let text = (str.match(/\)\[([\s\S]*?)]/) || [])[1];
                if (!href) return str;
                return (
                    '<a href="' + href + '" target="_blank">' + (text || href) + "</a>"
                );
            })
            .replace(html(null), "<$1 $2>")
            .replace(html(null), "</$1>") // 转移HTML代码
            .replace(/\n/g, "<br>"); // 转义换行
    }
    return content;
}
