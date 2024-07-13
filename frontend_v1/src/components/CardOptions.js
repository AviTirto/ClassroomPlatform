import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function CardOptions({index, onDelete, onEdit}) {
    return (
        <Menu>
            <MenuButton className="data-[active]:bg-gray-600 rounded-full px-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16"
                >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
            </MenuButton>
            <MenuItems anchor="bottom" className="bg-gray-600 text-white rounded-lg p-0 text-sm">
                <MenuItem className="w-full px-2">
                    <p className="block data-[focus]:bg-gray-500" onClick={onEdit}>
                        Edit
                    </p>
                </MenuItem>
                <MenuItem className="w-full px-2">
                    <p className="block data-[focus]:bg-gray-500">
                        Save
                    </p>
                </MenuItem>
                <MenuItem className="w-full px-2">
                    <p className="block data-[focus]:bg-gray-500" onClick={() => {onDelete(index)}}>
                        Delete
                    </p>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}
