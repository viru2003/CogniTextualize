import React, { useEffect, useRef, useState } from 'react'
import classes from './Sequence.module.css';
import SeqColumn from '../SequenceColumns/SeqColumn';
import { useDispatch, useSelector } from 'react-redux';
import {FormActions} from '../../store/store';

const Sequence = () => {
    const containerRef=useRef();
    // redux
    const state=useSelector(state=>state)
    const dispatch=useDispatch();

    // current state
    const [columns,setColumns]=useState([{
        id:1,
        FieldTitle:"Question Number",
        FieldType:"QN",
        DenotedBy:"Q"
    }]);

    useEffect(()=>{
        dispatch(FormActions.changeSequence(columns));
        // containerRef.current.scrollLeft=containerRef.current.scrollWidth;
    },[columns])

    const AddColumn = () => {
        setColumns(prevColumns => {
            const newColumn = {
                id:prevColumns[prevColumns.length-1].id+1,
                FieldTitle:"",
                FieldType:"Def",
                DenotedBy:"Def"
            };
            return [...prevColumns, newColumn];
        });
    }

    const RemoveColumn = () => {
        setColumns(prevColumns => {
            const newColumns = [...prevColumns];
            newColumns.pop(); 
            return newColumns;
        });
    };

    const updateColumn=(id,fieldName,newVal)=>{
        setColumns(prevColumns=>{
            // Create a new copy of the columns array
            const newColumns = [...prevColumns];
            // Find the index of the column to update
            const columnIndex = id - 1;
            // Create a new copy of the column object with the updated value
            const updatedColumn = {
            ...newColumns[columnIndex],
            [fieldName]: newVal,
            };
            // Update the newColumns array with the updated column object
            newColumns[columnIndex] = updatedColumn;
            return newColumns;
        });
    }
    const bgImageStyle = {
        backgroundImage: 'url(https://img.freepik.com/free-vector/white-abstract-background_23-2148844576.jpg?w=996&t=st=1713423045~exp=1713423645~hmac=3aec548de81f70ec1c2c12fbfc2c7213fbbe446e37be00856a169df54ee83c8e)',
        backgroundSize: 'cover', 
      };
    
  return (<div className='mt-4  p-3' style={bgImageStyle} >
  <div className="container-fluid  d-flex align-items-center justify-content-center">
<h1 >Sequence Info</h1>
</div>
    <div className={classes.Sequence} ref={containerRef} >
        <div className='${classes.Sequence_InnerContainer} d-flex align-items-center justify-content-center flex-wrap'>
            {columns[0]!=null ? 
            columns.map(item=><SeqColumn key={item.id} Update={updateColumn} Remove={RemoveColumn} Add={AddColumn} last={item.id==columns.length} id={item.id} FieldTitle={item.FieldTitle} fieldType={item.FieldType} denotedBy={item.DenotedBy}/>):null}
        </div>
    </div>
    </div>
  )
}

export default Sequence