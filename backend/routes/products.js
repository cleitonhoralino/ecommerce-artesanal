const express = require('express');

const router = express.Router();

const Product = require('../models/Product');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


// LISTAR PRODUTOS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar produtos'
    });
  }
});


// CRIAR PRODUTO (ADMIN)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,

  async (req, res) => {
    try {

      const {
        name,
        description,
        price,
        image_url,
        stock,
        category
      } = req.body;

      const product = new Product({
        name,
        description,
        price,
        image_url,
        stock,
        category
      });

      await product.save();

      res.status(201).json({
        message: 'Produto criado com sucesso',
        product
      });

    } catch (error) {
      res.status(500).json({
        message: 'Erro ao criar produto'
      });
    }
  }
);


// ATUALIZAR PRODUTO (ADMIN)
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,

  async (req, res) => {
    try {

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(updatedProduct);

    } catch (error) {
      res.status(500).json({
        message: 'Erro ao atualizar produto'
      });
    }
  }
);


// DELETAR PRODUTO (ADMIN)
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,

  async (req, res) => {
    try {

      await Product.findByIdAndDelete(req.params.id);

      res.json({
        message: 'Produto removido com sucesso'
      });

    } catch (error) {
      res.status(500).json({
        message: 'Erro ao remover produto'
      });
    }
  }
);


      // ATUALIZAR PRODUTO (ADMIN)
        router.put(
        '/:id',
        authMiddleware,
        adminMiddleware,

        async (req, res) => {

          try {

            const updatedProduct =
              await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                  new: true,
                }
              );

            if (!updatedProduct) {

              return res.status(404).json({
                message: 'Produto não encontrado'
              });
            }

            res.json({
              message: 'Produto atualizado com sucesso',
              product: updatedProduct
            });

          } catch (error) {

            res.status(500).json({
              message: 'Erro ao atualizar produto',
              error: error.message
            });
          }
        }
      );

module.exports = router;