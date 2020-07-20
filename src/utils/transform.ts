export let faceUtils = {
    alt: [
        "[微笑]",
        "[嘻嘻]",
        "[哈哈]",
        "[可爱]",
        "[可怜]",
        "[挖鼻]",
        "[吃惊]",
        "[害羞]",
        "[挤眼]",
        "[闭嘴]",
        "[鄙视]",
        "[爱你]",
        "[泪]",
        "[偷笑]",
        "[亲亲]",
        "[生病]",
        "[太开心]",
        "[白眼]",
        "[右哼哼]",
        "[左哼哼]",
        "[嘘]",
        "[衰]",
        "[委屈]",
        "[吐]",
        "[哈欠]",
        "[抱抱]",
        "[怒]",
        "[疑问]",
        "[馋嘴]",
        "[拜拜]",
        "[思考]",
        "[汗]",
        "[困]",
        "[睡]",
        "[钱]",
        "[失望]",
        "[酷]",
        "[色]",
        "[哼]",
        "[鼓掌]",
        "[晕]",
        "[悲伤]",
        "[抓狂]",
        "[黑线]",
        "[阴险]",
        "[怒骂]",
        "[互粉]",
        "[心]",
        "[伤心]",
        "[猪头]",
        "[熊猫]",
        "[兔子]",
        "[ok]",
        "[耶]",
        "[good]",
        "[NO]",
        "[赞]",
        "[来]",
        "[弱]",
        "[草泥马]",
        "[神马]",
        "[囧]",
        "[浮云]",
        "[给力]",
        "[围观]",
        "[威武]",
        "[奥特曼]",
        "[礼物]",
        "[钟]",
        "[话筒]",
        "[蜡烛]",
        "[蛋糕]"
    ],
    faces() {
        let self = this;
        let arr = {};
        for (let i = 0; i < self.alt.length; i++) {
            (arr as any)[self.alt[i]] = "./static/face/" + i + ".gif";
        }
        return arr;
    }
};

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
                    (fa as any)[alt] +
                    '" title="' +
                    (fa as any)[alt] +
                    '" src="' +
                    (fa as any)[alt] +
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
