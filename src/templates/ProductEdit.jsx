import React, { useState } from 'react'
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../reducks/products/operations'
import ImageArea from '../components/Products/imageArea'
import { useEffect } from 'react'
import { db } from "../firebase/index"
import SetSizeArea from '../components/Products/SetSizeArea'

const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/product/edit')[1];
    if (id !== "") {
        id = id.split('/')[1]
    }

    const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [images, setImages] = useState([]),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [price, setPrice] = useState(""),
        [sizes, setSizes] = useState([])


    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])


    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])


    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    const categories = [
        { id: "tops", name: "トップス" },
        { id: "shirts", name: "シャツ" },
        { id: "pants", name: "パンツ" },
    ]

    const genders = [
        { id: "all", name: "すべて" },
        { id: "male", name: "メンズ" },
        { id: "female", name: "レディース" }
    ]

    useEffect(() => {
        if (id !== "") {
            db.collection('products').doc(id).get().then(snapshot => {
                const product = snapshot.data()
                setName(product.name)
                setDescription(product.description)
                setImages(product.images)
                setCategory(product.category)
                setGender(product.gender)
                setPrice(product.price)
            })
        }
    }, [id])

    return (
        <section>
            <h2 className='u-text__headline u-text-center'>商品の登録・編集</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages} />
                <TextInput
                    fullWidth={true} label={"商品名"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"}
                >
                </TextInput>
                <TextInput
                    fullWidth={true} label={"商品説明"} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                >
                </TextInput>
                <SelectBox
                    label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category}
                />
                <SelectBox
                    label={"性別"} required={true} options={genders} select={setGender} value={gender}
                />
                <TextInput
                    fullWidth={true} label={"価格"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}
                >
                </TextInput>
                <div className="module-spacer--extra-extra-small" />
                <SetSizeArea sizes={sizes} setSizes={setSizes} />
                <div className="module-spacer--extra-extra-small" />
                <div className="module-spacer--medium" />
                <div className="center" />
                <PrimaryButton
                    label={"商品情報を保存"}
                    onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images))}
                />
            </div>
        </section>
    )
}

export default ProductEdit