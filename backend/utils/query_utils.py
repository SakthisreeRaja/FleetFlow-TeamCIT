from sqlalchemy import asc, desc


def apply_filters(query, model, filters: dict):
    for field, value in filters.items():
        if value and hasattr(model, field):
            query = query.filter(getattr(model, field) == value)
    return query


def apply_sorting(query, model, sort_by: str, order: str):
    if sort_by and hasattr(model, sort_by):
        column = getattr(model, sort_by)
        if order == "desc":
            query = query.order_by(desc(column))
        else:
            query = query.order_by(asc(column))
    return query


def apply_group_by(query, model, group_by: str):
    if group_by and hasattr(model, group_by):
        column = getattr(model, group_by)
        query = query.group_by(column)
    return query