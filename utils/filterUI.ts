export function getFilterLabel(attributes: any[] = [], filter) {
    for (const attribute of attributes) {
        if (attribute.code === filter.code) {
            return filter.ids.split(",").map((id) => {
                const option = attribute.options.find((o) => id === String(o.id));
                if (option) {
                    option.category = attribute.code;
                    return option;
                }
            });
        }
    }
}

export function getNewQueryFilterParams(newQueryParams: any, option: any) {
    const values = newQueryParams[option.category] as string; // comma separated values.

    if (!values) {
        return;
    }

    // option unchecked.
    const newValues = values
        .split(",")
        .filter((v) => v !== String(option.id))
        .join(",");

    if (!newValues) {
        delete newQueryParams[option.category];
    } else {
        newQueryParams[option.category] = newValues;
    }

    return newQueryParams;
}
