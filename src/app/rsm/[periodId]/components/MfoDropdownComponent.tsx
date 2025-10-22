'use client';

import { FaGears } from "react-icons/fa6";
import { TbAxisX, TbCursorText, TbEraser, TbTargetArrow, TbTransferVertical } from "react-icons/tb";
import { useMfoEditModalContext } from "../../context/MfoEditModalContext";

export default function MfoDropdownComponent({ row }: { row: Row }) {

  const { setRow, setEditType, setDeleteId, setSi } = useMfoEditModalContext();

  function handleMfoEdit(row: Row) {
    (document.getElementById('mfoEditModal') as HTMLDialogElement)?.showModal()
    setEditType('edit')
    setRow(row)
  }

  function handleAddSubMfo(row: Row) {
    (document.getElementById('mfoEditModal') as HTMLDialogElement)?.showModal()
    setEditType('sub')
    setRow(row)
  }

  function handleMfoMover(row: Row) {
    (document.getElementById('mfoMoverModal') as HTMLDialogElement)?.showModal()
    setRow(row)
  }

  function handleSiEdit(row: Row) {
    (document.getElementById('siEditModal') as HTMLDialogElement)?.showModal()
    setRow(undefined)
    setRow(row)
    setSi(undefined)
  }

  function handleDeleteMfo(row: Row) {
    (document.getElementById('MfoDeleteModal') as HTMLDialogElement)?.showModal()
    setDeleteId(row.cf_ID)
    // onPromptDeleteMfo(row.cf_ID)
  }


  return (
    <div className="dropdown dropdown-right">
      {/* <div tabIndex={0} role="button" className="btn btn-xs m-1 w-20">Edit MFO</div> */}
      <FaGears tabIndex={0} role="button" className="cursor-pointer text-xl text-green-600" />
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-70 p-2 shadow-sm">
        <li><a onClick={() => handleMfoEdit(row)}><TbCursorText /> Edit MFO Title</a></li>
        <li><a onClick={() => handleSiEdit(row)}><TbTargetArrow /> Add Success Indicator</a></li>
        <li><a onClick={() => handleMfoMover(row)}><TbTransferVertical /> Transfer MFO</a></li>
        <li><a onClick={() => handleAddSubMfo(row)}><TbAxisX />Add Sub-MFO</a></li>
        <li><a onClick={() => handleDeleteMfo(row)} className="text-red-600"><TbEraser />Delete MFO</a></li>
      </ul>
    </div >
  );
}