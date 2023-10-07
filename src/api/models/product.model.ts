import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, STRING, JSON } = DataTypes

export interface Product {
  productID?: number
  categoryID: number
  inventoryID: number
  code?: string
  name?: string
  desc?: string
  releaseDate?: string
  orderNumber?: number
}

export interface ProductInstance extends Model<Product>, Product {}

const ProductSchema = sequelize.define<ProductInstance>('products', {
  productID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryID: {
    type: INTEGER
  },
  inventoryID: {
    type: INTEGER
  },
  code: {
    type: STRING
  },
  name: {
    type: STRING
  },
  desc: {
    type: STRING
  },
  releaseDate: { type: STRING, allowNull: true, defaultValue: Date.now() },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(ProductSchema)

export default ProductSchema
