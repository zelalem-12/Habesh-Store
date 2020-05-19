module.exports = {
    JWT_SECRET: process.env.JWT_SECRET ||
    'noexcusethepowerofselfdisciplinefrombazratomaharishuniversityofmanagement',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'Ac7PN99ov_nz52BPSYT48z3-HmSFbfbFfQVCb0fJYKhenlUH26LcV0n2nxu5UMWhbnrnUUUROMiCtVFi',
    MONGODB_URL:  process.env.MONGODB_URI || 'mongodb://zelalem-12:zeleStrong%4012@cluster0-shard-00-00-00gch.mongodb.net:27017,cluster0-shard-00-01-00gch.mongodb.net:27017,cluster0-shard-00-02-00gch.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    PORT: process.env.PORT || 8000,
  };

