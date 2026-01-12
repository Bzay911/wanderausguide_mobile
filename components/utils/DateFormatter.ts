import { format, formatDistanceToNow } from "date-fns";

export const formattedDate = (date: Date) => {
    return format(new Date(date), "dd MMM yyyy");
};

export const relativeDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
}