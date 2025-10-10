'use client';

import { FaGears } from "react-icons/fa6";
import { TbAxisX, TbCursorText, TbEraser, TbTargetArrow, TbTransferVertical } from "react-icons/tb";
import { useMfoEditModalContext } from "../../context/MfoEditModalContext";

export default function EditMfoComponent({ row }: { row: Row }) {

  const { setRow } = useMfoEditModalContext();

  const handleMfoEdit = (row: Row) => {
    (document.getElementById('mfoEditModal') as HTMLDialogElement)?.showModal()
    setRow(row)
  }

  const handleMfoMover = (row: Row) => {
    (document.getElementById('mfoMoverModal') as HTMLDialogElement)?.showModal()
    setRow(row)
  }

  return (
    <div className="dropdown dropdown-right">
      {/* <div tabIndex={0} role="button" className="btn btn-xs m-1 w-20">Edit MFO</div> */}
      <FaGears tabIndex={0} role="button" className="cursor-pointer text-xl text-green-600" />
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-70 p-2 shadow-sm">
        <li><a onClick={() => handleMfoEdit(row)}><TbCursorText /> Edit MFO Title</a></li>
        <li><a><TbTargetArrow /> Add Success Indicator</a></li>
        <li><a onClick={() => handleMfoMover(row)}><TbTransferVertical /> Transfer MFO</a></li>
        <li><a><TbAxisX />Add Sub-MFO</a></li>
        <li><a className="text-red-600"><TbEraser />Delete MFO</a></li>
      </ul>
    </div >
  );
}