import React from 'react';

import { Text } from './Text';

export const FormError = ({ id, errors, field }) => {
    if (!errors?.[field]) return null;

    return (
        <Text id={id} as="p" variant="none" weight="normal" role="alert" className="mt-1.5 bg-red-900 px-3 py-1.5 text-xs leading-snug !text-white">
            {errors[field]}
        </Text>
    );
};

export const FormField = ({ id, name = id, label, errors, children }) => {
    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={id}>
                    {label}
                </label>
            )}

            {children}

            <FormError id={`${id}-error`} errors={errors} field={name} />
        </div>
    );
};
