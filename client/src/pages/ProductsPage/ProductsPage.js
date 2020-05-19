import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { LoadingBox, ErrorBox, CustomButton, SuccessBox, FormInput} from '../../components';
import { listProducts, deleteProduct, addProduct } from '../../actions/product-actions';
import styles from './ProductsPage.module.css';

const  ProductsPage = props => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const showModal = product => {
    setId(product._id);
    setName(product.name);
    setDescription(product.description);
    setSubCategory(product.brand);
    setImageUrl(product.imageUrl);
    setPrice(product.price);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setModalVisible(true);
  };
  const uploadImageFile = e => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('imageUrl', file);
    axios.post('/products', bodyFormData, {
      headers: {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    })
      .then(response => {
        setImageUrl(response.data);
      })
      .catch(response => {
        alert('Unable to upload product image');
      });
  };
 
  const submitHandler = e => {
    e.preventDefault();
    dispatch(addProduct({
      _id: id, name, subCategory, imageUrl, price, category, countInStock, description,
    }));
  };
  const productList = useSelector(state => state.productList);
  const productAdd = useSelector(state => state.productAdd);
  const productDelete = useSelector(state => state.productDelete);

  const { loading, products, error } = productList;
  const { loading: loadingSave, success: successSave, error: errorSave } = productAdd;
  const { loading: loadingDelete, delete: successDelete, error: errorDelete } = productDelete;

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }

    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);
  
  return loading
    ? <LoadingBox /> : error ? <ErrorBox message={error} /> : (
      <div className = {`content ${styles.content_margined}`}>
      {!modalVisible && <div className = {styles.product_container}>
        <div className={styles.products_header}>
          <h1 className ={styles.span}>Products</h1>    
          <CustomButton 
                type="button"
                onClick={() => showModal({})}           
                > Create Product
               </CustomButton>
        </div>
        { loadingDelete &&  <LoadingBox /> }
        { errorDelete &&  <ErrorBox message={errorDelete} />}
         {(!!successDelete) && <SuccessBox message = {successDelete.message}/>} 
        <div className ={styles.product_container}> 
       { products.length === 0 ? (
          <div className={styles.empty_list}>
            There is no products.
          </div>) : 
               <div className={styles.product_list}>
               <div className={styles.product_header}>
                 <div className={styles.header_block} style ={{width: '25%'}}>
                   <span>Product</span>
                 </div>
                 <div className={styles.header_block}>
                   <span>name</span>
                 </div>
                 <div className={styles.header_block}>
                   <span>Price</span>
                 </div>
                 <div className={styles.header_block}>
                   <span>category</span>
                 </div>
                 <div className={styles.header_block} >
                   <span>edit</span>
                 </div>
                 <div className={styles.header_block}>
                   <span>delete</span>
                 </div>
               </div>
               {products.map(product =>
                      <div className={styles.product_item}>
                       {/* <span className={styles.id}>{product._id}</span> */}
                      <div className={styles.image_container}>
                        <img className ={styles.product_img_list} src={`${process.env.PUBLIC_URL}/${product.imageUrl}`} alt='item' />
                      </div>
                      <span className={styles.name}>{product.name}</span>
                      <span className={styles.price}>$ {product.price}</span>
                      <span className={styles.category}>{product.category}>{product.subCategory}</span>
                      <div className={styles.update_button}
                        onClick={() => showModal(product)}>
                          edit
                      </div>
                      <div className={styles.remove_button}
                        onClick={() =>  dispatch(deleteProduct(product._id))}>
                         &#10005;
                      </div>
                    </div>
                   ) }
                </div>  
                }
              </div>
          </div>
          }
        {modalVisible
          && (
            <div className={styles.createProduct}>
              <div className={styles.creatback}>
              <span onClick={() => setModalVisible(false)} className ={styles.back}>Back</span>
              <h3 className ={styles.span}>Create Product</h3>
                 </div>
              {errorSave && <ErrorBox message={error} />}
              {loading && <LoadingBox />}
              <form onSubmit={submitHandler} className={styles.form}>
              <FormInput
                  type='text'
                  name='name' 
                  value={name}
                  handleChange = {e => setName(e.target.value)}
                  label='Name'
                  required
              />
               <FormInput
                  type='text'
                  id='imageUrl' 
                  name='imageUrl' 
                  value={imageUrl}
                  handleChange = {e => setImageUrl(e.target.value)}
                  label='Image (680 X 830)'
                  required
              />
             <FormInput
                  type='file'
                  name='imageFile'
                  handleChange = {event => uploadImageFile(event)}
                  required
              />
              <FormInput
                  type='number'
                  name='price'
                  value={price}
                  handleChange = {e => setPrice(e.target.value)}
                  label='Price'
                  required
              />
           <FormInput
                  type='text'
                  name='category'
                  value={category}
                  handleChange = {e => setCategory(e.target.value)}
                  label='Category'
                  required
              />
              <FormInput
                  type='text'
                  name='subCategory' 
                  value={subCategory}
                  handleChange = {e => setSubCategory(e.target.value)}
                  label='Sub category'
                  required
              />
             <FormInput
                  type='number'
                  name='countInStock'
                  value={countInStock}
                  handleChange = {e => setCountInStock(e.target.value)}
                  label='Count In Stock'
                  required
              />
            <FormInput
                  type='text'
                  name='description'
                  value={description}
                  handleChange = {e => setDescription(e.target.value)}
                  label=' Description'
                  required
              />             
                    <CustomButton type="submit">
                      {id ? 'Update' : 'Create'}
                      {' '}
                      Product
                    </CustomButton>
              </form>
            </div>
          )}
      </div>
    );
}
export default ProductsPage;

