export function getQuery(searchParams: URLSearchParams)
{
    const filter: any = {};
    for (let [key, value] of searchParams)
    {
        filter[key] = value;
    }

    delete filter.sort_by;

    if (!!filter.active)
    {
        filter.active = filter.active === 'true';
    }
    return filter;
}