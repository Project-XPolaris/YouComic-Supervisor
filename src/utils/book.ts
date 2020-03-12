import {Book} from '@/services/book';

export function getBookTagInfo(book: Book | undefined) {
    const series = book?.tags?.find(tag => tag.type === 'series');
    const author = book?.tags?.find(tag => tag.type === 'artist');
    const theme = book?.tags?.find(tag => tag.type === 'theme');
    const translator = book?.tags?.find(tag => tag.type === 'translator');
    return {series, author, theme, translator};
}
