import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ToastPosition } from './provider';
export const TOAST_AUTO_DELETE_TIME = 5000;
export const TOAST_COUNT_LIMIT = 4;
const Toast = ({ style }) => (<ToastContainer limit={TOAST_COUNT_LIMIT} position={ToastPosition.BottomRight} autoClose={TOAST_AUTO_DELETE_TIME} hideProgressBar={true} newestOnTop={true} closeOnClick={false} closeButton={false} rtl={false} pauseOnFocusLoss={false} style={style} draggable={false} pauseOnHover={false}/>);
export default Toast;
