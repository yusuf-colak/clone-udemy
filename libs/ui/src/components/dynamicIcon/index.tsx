import React from 'react';
import * as Icons from 'lucide-react';

const DynamicIcon = ({ name, ...props }: any) => {
    const IconName = name.charAt(0).toUpperCase() + name.slice(1);

    // @ts-ignore
    const IconComponent = Icons[IconName];

    return IconComponent ? <IconComponent {...props} /> : null;
};

export default DynamicIcon;
