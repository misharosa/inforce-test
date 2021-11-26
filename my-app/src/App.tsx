import './App.scss'
import { Card } from './components/Card';
import Modal from 'react-modal';
import React, { ChangeEvent, FormEvent } from 'react';
import ItemsFromServer from './data/products.json'

export class App extends React.Component<any, any> {

    state= {
        product: ItemsFromServer,
        modalIsOpen: false,
        name: '',
        imageUrl: '',
        visibleError: false,
    }

    handleName = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        this.setState({ name: value })
    }

    handleImageUrl = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        this.setState({ imageUrl: value })
    }

    setIsOpen = () => {
        this.setState((prevState:any) => ({
            modalIsOpen: !prevState.modalIsOpen
        }))
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { name, imageUrl, product } = this.state
        const newProduct = {name, imageUrl, id: product.length + 1 }

        if (name.length > 0) {
            this.setState((prevState:any) => ({
                product: [...prevState.product, newProduct],
                modalIsOpen: false,
                visibleError: false,
                name: '',
                imageUrl: '',
            }))
        } else {
            this.setState({ visibleError: true})
        }
    }

    handleDelete = (itemId: number) => {
        const { product } = this.state

        this.setState({
            product: product.filter(item => item.id !== itemId)
        })
    }

render() {
    const { modalIsOpen, name, product, imageUrl, visibleError } = this.state;

    return (
        <div>
            <button onClick={this.setIsOpen}>Add</button>
            {
                product.map((item:any) => <Card
                    key={item.id}
                    item={item}
                    onDelete={this.handleDelete}
                />)
            }
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Example Modal"
            >
                <h2>Hello</h2>
                <button
                    onClick={this.setIsOpen}
                >
                    close
                </button>
                <div>I am a modal</div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                        placeholder="Name..."
                        value={name}
                        onChange={(event) => this.handleName(event)}
                        />
                        <br/>
                        {visibleError &&
                        <span style={{ color: 'red', fontSize: '12px'}}>please enter the name</span>
                        }
                    </div>
                    <div>
                        <input
                            placeholder="add_img_link"
                            value={imageUrl}
                            onChange={(event) => this.handleImageUrl(event)}
                        />
                    </div>
                    <button
                        type="submit"
                    >
                        add item
                    </button>
                </form>
            </Modal>
        </div>
    )
    }
}
