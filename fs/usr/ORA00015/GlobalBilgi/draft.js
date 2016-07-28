[
    '{{repeat(50, 60)}}',
    {
        id: '{{index}}',
        name        : '{{lorem(2)}}'
        isActive    : '{{bool}}',
        startDate   : '{{date(YYYY-MM-ddThh:mm:ss Z)}}',
        endDate     : '{{date(YYYY-MM-ddThh:mm:ss Z)}}',
        recordCount : '{{numeric(1000,100000)}}',
        userCount   : '{{numeric(1000,100000)}}',
        roleCount   : '{{numeric(100,1000)}}'
    }
]