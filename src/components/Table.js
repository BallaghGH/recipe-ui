import React, { useState, useReducer } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const Table = ({
  data,
  createEntry,
  updateEntry,
  setEditValue,
  deleteEntry,
  edit,
  remove,
  add,
  confirmBeforeEdit,
  onModalClose
}) => {  
  // State
  const [editing, setEditing] = useState(0);
  const [deleting, setDeleting] = useState({});
  const [creating, setCreating] = useState('');
  const [variation, setVariation] = useState('');
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleEdit = (id) => {
    // If editing already, close edit.
    if (id === editing) {
      setEditing(0);

      return;
    }

    setEditing(id);
  };

  const returnState = () => {
    setOpen(false);
    setVariation('');
    setDeleting({});
    setEditing(0);
    setAdding(false);
  }

  return (
    <>
      {open && confirmBeforeEdit && (
        <div className="modal">
        <div className="modal-content">
          <div className="modal-content--head">
            <div onClick={onModalClose} className="close">&times;</div>
          </div>
          <h3>{variation} Entry</h3>
          <div className="modal-content--body">
            <p>Are you sure you want to {variation.toLowerCase()} {deleting.name}</p>
          </div>
          <div className="modal-content--buttons">
            <button 
              onClick={() => {
                deleteEntry(deleting.id, deleting)

                returnState();
              }}
            >
              DELETE
            </button>
            <button onClick={returnState}>CANCEL</button>
          </div>
        </div>
      </div>  
      )}
      {add && (
        <div className="add--container">
          <AddIcon onClick={() => setAdding(true)} />
        </div>
      )}
      <table cellSpacing="0" className="unit-table" id="unitTable">
          <thead>
              <tr>
                <th>Ingredient Units</th>
                {edit && (
                  <th>Edit</th>
                )}
                {remove && (
                  <th>Remove</th>
                )}
              </tr>
          </thead>
          <tbody>
            {adding && (
              <>
                <tr>
                  <td>
                    <div className="unit-table--editBox">
                      <textarea onChange={(val) => setCreating(val.currentTarget.value)} className="unit-table--editText"></textarea>
                        <PublishIcon onClick={() => {
                          createEntry(creating) 

                          returnState();
                        }} />
                        </div>
                  </td>
                </tr>
              </>
            )}
            {data.map(row => {
              return (
                <>
                  <tr>
                    <td>
                      {editing === row.id ? (
                        <div className="unit-table--editBox">
                          <textarea onChange={(val) => setEditValue(val.currentTarget.value)} className="unit-table--editText" defaultValue={row.name}></textarea>
                          <PublishIcon onClick={() => {
                            updateEntry(row.id, row);

                            setEditValue('');
                          } } />
                        </div>
                      ) : (
                        <p>{row.name}</p>
                      )}
                    </td>
                    {edit && (
                      <td className="edit-icon">
                        <EditIcon 
                          onClick={(event) => handleEdit(event, row.id)} 
                        />
                      </td>
                    )}
                    {remove && (
                      <td className="remove-icon">
                        <RemoveCircleOutlineIcon 
                          onClick={() => {
                            if (confirmBeforeEdit) {
                              setOpen(true);
                              setDeleting({id: row.id, name: row.name});

                              return;
                            }

                            deleteEntry({id: row.id, name: row.name})
                          }}/>
                      </td>
                    )}
                  </tr>
                </>
              ); 
            })}
          </tbody>
      </table>
    </>     
  );
};

export default Table;
