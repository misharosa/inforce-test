import React from 'react';
import Modal from 'react-modal';
import { Item } from "../types/type";

type Props = {
    item: Item
    onDelete: (itemId: number) => void
}

export const Card:React.FC<Props> = ({ item, onDelete }) => {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <div className="card main-content__card">
                <img
                    src={item.imageUrl}
                    className="card__img"
                    alt="some photo here"
                />
                    <h2 className="card__title">
                        {item.name}
                    </h2>
                <button onClick={() => {onDelete(item.id)}}>Delete</button>
                <Modal
                    isOpen={modalIsOpen}
                    contentLabel="Example Modal"
                >
                    <h2>Hello</h2>
                    <button
                        onClick={() => setIsOpen(false)
                    }>
                        close
                    </button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                    </form>
                </Modal>
            </div>
        </>)
};
