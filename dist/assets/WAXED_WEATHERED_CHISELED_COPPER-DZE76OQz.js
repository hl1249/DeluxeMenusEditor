const A="data:image/png;base64,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";export{A as default};
