import { useForm } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
};

type Props = {
    products: Product[];
    title: string;
};

export default function Products({ products, title }: Props) {
    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post('/products', {
            onSuccess: () => reset(),
        });
    }

    function deleteProduct(id: number) {
        if (confirm('Ви дійсно хочете видалити цей товар?')) {
            destroy(`/products/${id}`);
        }
    }

    return (
        <div
            style={{
                maxWidth: '1000px',
                margin: '40px auto',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                color: '#222',
            }}
        >
            <h1 style={{ marginBottom: '10px', fontSize: '32px' }}>{title}</h1>
            <p style={{ marginBottom: '30px', color: '#666' }}>
                Тут можна додавати нові товари та переглядати список уже створених.
            </p>

            <div
                style={{
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '30px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
            >
                <h2 style={{ marginBottom: '20px' }}>Додати новий товар</h2>

                <form onSubmit={submit}>
                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                            Назва товару
                        </label>
                        <input
                            type="text"
                            placeholder="Наприклад: Ноутбук"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '16px',
                            }}
                        />
                        {errors.name && (
                            <div style={{ color: 'red', marginTop: '6px' }}>{errors.name}</div>
                        )}
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                            Опис
                        </label>
                        <textarea
                            placeholder="Короткий опис товару"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '12px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '16px',
                                resize: 'vertical',
                            }}
                        />
                        {errors.description && (
                            <div style={{ color: 'red', marginTop: '6px' }}>{errors.description}</div>
                        )}
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                            Ціна
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Наприклад: 19999.99"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '16px',
                            }}
                        />
                        {errors.price && (
                            <div style={{ color: 'red', marginTop: '6px' }}>{errors.price}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            border: 'none',
                            padding: '12px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {processing ? 'Збереження...' : 'Додати товар'}
                    </button>
                </form>
            </div>

            <div
                style={{
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
            >
                <h2 style={{ marginBottom: '20px' }}>Список товарів</h2>

                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        overflow: 'hidden',
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#f3f4f6' }}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Назва</th>
                            <th style={thStyle}>Опис</th>
                            <th style={thStyle}>Ціна</th>
                            <th style={thStyle}>Дія</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={tdStyle}>{product.id}</td>
                                    <td style={tdStyle}>{product.name}</td>
                                    <td style={tdStyle}>{product.description || '—'}</td>
                                    <td style={tdStyle}>{product.price} грн</td>
                                    <td style={tdStyle}>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            style={{
                                                backgroundColor: '#dc2626',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '8px 14px',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Видалити
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    style={{
                                        padding: '20px',
                                        textAlign: 'center',
                                        color: '#777',
                                    }}
                                >
                                    Товарів поки немає
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const thStyle = {
    padding: '12px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #ddd',
};

const tdStyle = {
    padding: '12px',
    textAlign: 'left' as const,
};