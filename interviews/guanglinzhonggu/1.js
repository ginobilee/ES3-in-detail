const Sequelize = require("sequelize")

// 1. 初始化连接
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "mysql"
})

// 2. User 表
sequelize.define(
  "User",
  {
    id: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING }
  },
  {
    indexes: [
      // 建立 id 索引
      {
        unique: true,
        fields: ["id"]
      }
    ]
  }
)

// 3. UserReferral
sequelize.define(
  "UserReferral",
  {
    id: { type: Sequelize.STRING },
    referralId: { type: Sequelize.STRING }, // 扫码进来的用户id
    userId: { type: Sequelize.STRING } // 二维码拥有者的id
  },
  {
    indexes: [
      // 建立 userId 索引
      {
        unique: true,
        fields: ["userId"]
      }
    ]
  }
)

/**
 *
 * @param {Object} user
 * @return {Number} the number of total referrals
 */
async function getTotalReferral(user) {
  // 1. 校验 user.id
  if (!user.id) {
    return []
  }

  // 2. 根据 userIds 去获取记录；完成后更新 userIds 与 referralIds
  let referralIds = new Set(user.id)
  let userIds = [user.id]
  while (userIds.length) {
    const records = await sequelize.findAll({ where: { userId: userIds } })
    userIds = []
    for (let record of records) {
      if (!referralIds.has(record.referralId)) {
        referralIds.add(record.referralId)
        userIds.push(record.referralId)
      }
    }
  }
  return referralIds.size
}
