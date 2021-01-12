import React from 'react';

export default function Tab({ children, active = false, ...props }) {
    return active ? <div {...props}>{children}</div> : null;
}
