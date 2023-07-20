import React, { cloneElement } from 'react';

const MultiProvider = (props) => {
    let content = props.children || null;

    /* Error/Validation */
    if (!props.providers) {
        throw 'MultiProvider: Missing providers prop';
    }

    if (!props.children) {
        throw 'MultiProvider: Missing children';
    }

    // Turn object into an array
    // const numberOfProviders = props.providers.size;
    const numberOfProviders = props.providers.length;

    if (!numberOfProviders) {
        // Providers prop is empty
        return content;
    }

    props.providers.map((provider) => {
        content = cloneElement(provider, null, content);
    });

    return content;
};

export default MultiProvider;
