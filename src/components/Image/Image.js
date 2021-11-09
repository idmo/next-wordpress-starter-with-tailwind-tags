const Image = ({ children, width = '100%', src, alt, srcSet, sizes, dangerouslySetInnerHTML }) => {
  return (
    <figure>
      <div>
        <img
          className="object-cover obect-center h-[230px]"
          width={width}
          src={src}
          alt={alt || ''}
          srcSet={srcSet}
          sizes={sizes}
        />
      </div>
      {children && <figcaption>{children}</figcaption>}
      {dangerouslySetInnerHTML && (
        <figcaption
          dangerouslySetInnerHTML={{
            __html: dangerouslySetInnerHTML,
          }}
        />
      )}
    </figure>
  );
};

export default Image;
