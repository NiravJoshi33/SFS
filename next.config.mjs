/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude the folder from the client-side build
    if (!isServer) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        include: [/ignored-folder/],
        use: {
          loader: "null-loader",
        },
      });
    }

    // You might also want to exclude the folder from the server-side build
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push(function ({ context, request }, callback) {
        if (/ignored-folder/.test(request)) {
          return callback(null, "commonjs " + request);
        }
        callback();
      });
    }

    return config;
  },
};

export default nextConfig;
