module.exports = {
  apps: [{
    name: 'qbit-core',
    script: 'dist/main.js',
    cwd: "./", //根目录
    watch: false,
    instances: 4,
    autorestart: true,
    exec_mode: "cluster",
    // 自定义应用程序的错误日志文件(错误日志文件)
    error_file: './logs/pm2-app-err.log',
    // 自定义应用程序日志文件(正常日志文件)
    out_file: './logs/pm2-app-out.log',
    // 设置追加日志而不是新建日志
    merge_logs: true,
    // 指定日志文件的时间格式
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    env: {
      NODE_ENV: 'development' //使用production模式 pm2 start ecosystem.config.js --env development
    },
    env_staging: {
      NODE_ENV: "staging", //使用staging模式 pm2 start ecosystem.config.js --env staging
    },
    env_production: {
      NODE_ENV: 'production' //使用production模式 pm2 start ecosystem.config.js --env production
    },
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
