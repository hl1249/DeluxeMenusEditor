const A="data:image/png;base64,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";export{A as default};
