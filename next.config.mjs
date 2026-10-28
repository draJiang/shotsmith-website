// Mac App 的安装包和 Sparkle appcast 发布在本仓库的 GitHub Release 里（jietu 仓库 scripts/release.sh）。
// App 内置的更新地址是 /appcast.xml，这里跳到最新 Release；以后换托管只改这里，已安装的 App 不受影响
const releases = 'https://github.com/draJiang/shotsmith-website/releases/latest/download';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            { source: '/appcast.xml', destination: `${releases}/appcast.xml`, permanent: false },
            { source: '/download', destination: `${releases}/Shotsmith.dmg`, permanent: false },
        ];
    },
};

export default nextConfig;
