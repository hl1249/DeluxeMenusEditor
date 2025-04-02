const A="data:image/png;base64,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";export{A as default};
