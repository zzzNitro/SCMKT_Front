import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../actions/index';
import { useModal } from 'react-hooks-use-modal';
import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import DetalleContratoPreview from './DetalleContratoPreview';
import Swal from 'sweetalert2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ethLogo from './imagenes/eth.png';

import './styles/buildContract.css';


export function BuildContract() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [checked, setChecked] = useState(false);
    const [input, setInput] = useState({
        id: '',
        wallet1: '',
        wallet2: '',
        name: '',
        type: '',
        duration: '',
        category: '',
        shortdescription: '',
        longdescription: '',
        amount: '0.00000001',
        coin: 'ETH',
        c1: '',
        c2: '',
        status: 'unpublished',
        ownerId: user.id,
        pat: ''
    })

    const [errors, setErrors] = useState({});
    const [modalIsOpen] = useState(false);
    const [Modal, open, close, isOpen] = useModal('root', {});

    const html = `${input.shortdescription}`
    const contentBlock = htmlToDraft(html);

    const [contentState, setContentState] = useState(
        contentBlock ?
            ContentState.createFromBlockArray(contentBlock.contentBlocks)
            : null
    )

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(contentState)
    );

    const htmlLong = `${input.longdescription}`
    const contentBlockLong = htmlToDraft(htmlLong);

    const [contentStateLong, setContentStateLong] = useState(
        contentBlockLong ?
            ContentState.createFromBlockArray(contentBlockLong.contentBlocks)
            : null
    )

    const [editorStateLong, setEditorStateLong] = useState(() =>
        EditorState.createWithContent(contentStateLong)
    );

    useEffect(() => {
        dispatch(getUsers({}))
    }, [dispatch]);

    function validate(elem) {
        if (input[elem] === '') {
            let inputName = elem.charAt(0).toUpperCase() + elem.slice(1)
            setErrors({ ...errors, [elem]: `The ${inputName} field is required` });
        } else {
            setErrors({ ...errors, [elem]: "" });
        }

        return errors;
    };

    const handleInputChange = (e) => {
        console.log(e.target.value)
        if (e.target.name === 'file-c1') {
        } else if (e.target.name === 'file-c2') {
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }
    };

    function onChangeValue(e, name) {
        e.preventDefault();
        setInput({
            ...input,
            [name]: e.target.value,
            shortdescription: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            longdescription: draftToHtml(convertToRaw(editorStateLong.getCurrentContent()))
        })
        setErrors(validate({
            ...input,
            [name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
    }

    const cancelPublished = (e) => {
        e.preventDefault()
        cancelContract('published')
    }

    const cancelContract = () => {
        Swal.fire({
            title: '¿Está seguro de salir sin guardar el contrato ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace(`https://scmkt-4fe6b.web.app/contratos/`)
            }
        })
    }

    const onChangeDuration = (e) => {
        const nameEvent = e.target.name;

        if (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) {
            setInput({
                ...input,
                [nameEvent]: e.target.value,
                shortdescription: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                longdescription: draftToHtml(convertToRaw(editorStateLong.getCurrentContent()))
            })
        }
    }

    const showPrevious = () => {
        setInput({
            ...input,
            shortdescription: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            longdescription: draftToHtml(convertToRaw(editorStateLong.getCurrentContent())),
        })
        open()
    }

    return (
        <div className='wraper-crear' >
            <div className="contractComponent">
                <div className="contractForm">
                    <form className='contractForm-form' onSubmit={handleOnSubmit}>
                        <a className='labelForm-buildContract'>Crea un contrato para comenzar a buscar desarrolladores que puedan resolver tus pruebas.</a>
                        <hr />



                        <div className="labelInput">
                            <div className="labelContract">Nombre del Contrato</div>

                            <div className="inputForm">
                                <input
                                    className="inputFormComponent"
                                    type="text"
                                    name="name"
                                    onChange={e => { handleInputChange(e) }}
                                    onBlur={(e) => validate(e.target.name)}
                                />
                            </div>
                        </div>




                        <div className='tiempoRecompensa'>
                            <div className="labelInput">
                                <div className="labelContract">Tiempo</div>
                                <div className="inputForm">
                                    <input
                                        className="inputFormComponentTr"
                                        type="text"
                                        name="duration"
                                        value={input.duration}
                                        min="0"
                                        onChange={onChangeDuration}
                                    />
                                    días
                                </div>
                            </div>

                            <div className="labelInput">
                                <div className="labelContract">Recompensa
                                    {/* <img
                                        src={ethLogo}
                                        alt='eth'
                                        width="10%"
                                        height="10%"
                                    /> */}
                                </div>
                                <div className="inputForm">
                                    <input
                                        className="inputFormComponentTr"
                                        type="number"
                                        min="0.00000001"
                                        max="100"
                                        step="0.00000001"
                                        name="amount"
                                        onChange={e => { handleInputChange(e) }}
                                        onBlur={(e) => validate(e.target.name)}
                                    />
                                    ETH
                                </div>
                            </div>

                        </div>











                        <div className='combo'>
                            {/* <div>
                                <div className="labelForm-buildContract">Tipo</div>
                                <div className="inputForm">
                                    <select className="inputFormCoin" name="type">
                                        <option value="" name='' onChange={e => { onChangeValue(e, 'type') }} ></option>
                                        <option value="Desafio" name='Desafio' onChange={e => { onChangeValue(e, 'type') }}>Desafío</option>
                                        <option value="Solucion" name='Solucion' onChange={e => { onChangeValue(e, 'type') }}>Solución</option>
                                    </select>
                                </div>
                            </div> */}


                            {/* <div>
                                <div className="labelForm-buildContract">Categoría</div>
                                <div className="inputForm">
                                    <select className="inputFormCoin" name="category">
                                        <option value="" name='' onChange={e => { onChangeValue(e, 'category') }} ></option>
                                        <option value="Principiante" name='Principiante' onChange={e => { onChangeValue(e, 'category') }}>Principiante</option>
                                        <option value="Intermedio" name='Intermedio' onChange={e => { onChangeValue(e, 'category') }}>Intermedio</option>
                                        <option value="Avanzado" name='Avanzado' onChange={e => { onChangeValue(e, 'category') }}>Avanzado</option>
                                    </select>
                                </div>
                            </div> */}
                        </div>
                        <div className='combo'>

                            {/* <div>
                                <div className="labelForm-buildContract">Moneda</div>
                                <div className="inputForm">
                                    <select className="inputFormCoin" name="coin" onChange={e => { onChangeValue(e, 'coin') }}>
                                        <option value="" name='' onChange={e => { onChangeValue(e, 'coin') }}></option>
                                        <option value="ETH" name='ETH' onChange={e => { onChangeValue(e, 'coin') }}>ETH</option>
                                    </select>
                                </div>
                            </div> */}
                        </div>
                        <div className="labelInput">
                            <div className="labelContract">Describe tu problema

                            </div>
                            <div className='input-reach-text'>
                                {/* https://github.com/jpuri/react-draft-wysiwyg/blob/master/stories/ControlledSelectedOptions/index.js */}
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    defaultContentState={contentState}
                                    onContentStateChange={setContentState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    toolbar={{
                                        inline: {
                                            options: ['bold', 'italic', 'underline']
                                        },
                                        blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
                                        fontSize: { className: 'demo-option-custom-medium' },
                                        list: {
                                            options: ['unordered', 'ordered'],
                                        },
                                        textAlign: {
                                            left: { className: 'demo-option-custom' },
                                            center: { className: 'demo-option-custom' },
                                            right: { className: 'demo-option-custom' },
                                            justify: { className: 'demo-option-custom' },
                                        },
                                        fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
                                        link: {
                                            popupClassName: 'demo-popup-custom',
                                            link: { className: 'demo-option-custom' },
                                            unlink: { className: 'demo-option-custom' },
                                        },
                                        emoji: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                        embedded: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                        image: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                        remove: { className: 'demo-option-custom' },
                                        history: {
                                            undo: { className: 'demo-option-custom' },
                                            redo: { className: 'demo-option-custom' },
                                        },
                                        options: ['blockType', 'fontSize', 'inline', 'list', 'fontFamily', 'link', 'remove', 'history']
                                    }}
                                />
                            </div>


                            {/* <div>
                                <div className="labelForm-buildContract">
                                    Escribe aquí tu Personal-Access-Token:
                                </div>
                                <input type="text" name="pat" onChange={e => { handleInputChange(e) }} />

                            </div> */}
                            <div className="labelInput">
                                <div className="labelContract">
                                    Escribe aquí tu test
                                </div>
                                <div className='input-reach-text'>
                                    <Editor
                                        editorState={editorStateLong}
                                        onEditorStateChange={setEditorStateLong}
                                        defaultContentState={contentStateLong}
                                        onContentStateChange={setContentStateLong}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        toolbar={{
                                            inline: {
                                                options: ['bold', 'italic', 'underline']
                                            },
                                            blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
                                            fontSize: { className: 'demo-option-custom-medium' },
                                            list: {
                                                options: ['unordered', 'ordered'],
                                            },
                                            textAlign: {
                                                left: { className: 'demo-option-custom' },
                                                center: { className: 'demo-option-custom' },
                                                right: { className: 'demo-option-custom' },
                                                justify: { className: 'demo-option-custom' },
                                            },
                                            fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
                                            link: {
                                                popupClassName: 'demo-popup-custom',
                                                link: { className: 'demo-option-custom' },
                                                unlink: { className: 'demo-option-custom' },
                                            },
                                            emoji: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                            embedded: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                            image: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                            remove: { className: 'demo-option-custom' },
                                            history: {
                                                undo: { className: 'demo-option-custom' },
                                                redo: { className: 'demo-option-custom' },
                                            },
                                            options: ['blockType', 'fontSize', 'inline', 'list', 'fontFamily', 'link', 'remove', 'history']
                                        }}
                                    />
                                </div>
                            </div>
                            {/* <div>
                                <div className="labelForm-buildContract">
                                    Escribe aquí tu Personal-Access-Token:
                                </div>
                                <input type="text" name="pat" onChange={e => { handleInputChange(e) }} />
                            </div> */}

                            <div className="labelInput">
                                <div className="labelContract">Personal-Access-Token:</div>
                                <div className="inputForm">
                                    <input
                                        className="inputFormComponent"
                                        type="text"
                                        name="pat"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        // size='small'
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                        color="default"
                                        onChange={() => setChecked(!checked)}
                                    />
                                }
                                label="Declaro que los datos ingresados son correctos y que los fondos serán transferidos a quien suba un archivo capaz de resolver los tests adjuntos en este formulario"
                            />
                            <div className='group-button-build'>
                                <button
                                    type='submit'
                                    className={
                                        input.name === "" ||
                                            input.shortdescription === "" ||
                                            input.longdescription === "" ||
                                            input.amount === "" ||
                                            input.coin === "" ||
                                            !checked
                                            ? "acept-contract acept-contract-disable"
                                            : "acept-contract"
                                    }
                                    onClick={showPrevious}
                                    disabled={
                                        input.name === "" ||
                                            input.shortdescription === "" ||
                                            input.longdescription === "" ||
                                            input.amount === "" ||
                                            input.coin === "" ||
                                            !checked
                                            ? true
                                            : false
                                    }
                                >Previsualizar</button>
                                <button
                                    className="acept-contract"
                                    onClick={cancelPublished}>Cancelar</button>
                            </div>
                            <div className={isOpen ? '' : ''} visible={isOpen}>
                                <Modal
                                    visible={modalIsOpen}>
                                    <div className='modal-overlay'>
                                        <DetalleContratoPreview
                                            visible={close}
                                            onClose={close}
                                            dataPreview={input}
                                        />
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BuildContract;

// 483 líneas antes de la depuración

// editorClassName="demo-editor-custom"