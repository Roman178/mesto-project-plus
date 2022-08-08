import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} from '../controllers/cards';

const cardsRouter = Router();

export default cardsRouter
  .get('/', getCards)
  .post('/', createCard)
  .delete('/:cardId', deleteCard)
  .put('/:cardId/likes', likeCard)
  .delete('/:cardId/likes', unlikeCard);
