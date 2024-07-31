/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {protocol:'https', hostname:''} //allow images form a particular host name
        ]
    }
};

export default nextConfig;
