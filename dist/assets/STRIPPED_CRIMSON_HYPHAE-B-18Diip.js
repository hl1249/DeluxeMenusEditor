const A="data:image/png;base64,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";export{A as default};
