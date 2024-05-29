import { Model, DataTypes } from 'sequelize'
import sequelize from '.'

class VerifyCodes extends Model {
  public email!: string
  public code!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

VerifyCodes.init(
  {
    email: DataTypes.STRING,
    code: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: 'VerifyCodes',
  }
)

export default VerifyCodes
