import injectButton from './injectButton';
import getRelevantFiles from './getRelevantFiles';

try {
    getRelevantFiles();
} catch (e) {}

injectButton();
