import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  quotes: {
    USD: {
      price: number;
      ath_price: number;
      ath_date: string;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      market_cap: number;
      volume_24h: number;
    };
  };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardColor};
  padding: 12px 16px;
  border-radius: 10px;
`;

const Label = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  opacity: 0.8;
`;

const Value = styled.span`
  font-weight: 600;
`;

const Change = styled.span<{ isUp: boolean }>`
  font-weight: 600;
  color: ${(props) => (props.isUp ? "#2ecc71" : "#e74c3c")};
`;

function formatNumber(n: number) {
  return new Intl.NumberFormat().format(n);
}

export default function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );

  if (isLoading) return <div>Loading price...</div>;
  if (!data) return <div>No data</div>;

  const usd = data.quotes.USD;

  return (
    <Wrapper>
      <Row>
        <Label>Price (USD)</Label>
        <Value>${usd.price.toFixed(3)}</Value>
      </Row>

      <Row>
        <Label>All Time High</Label>
        <Value>${usd.ath_price.toFixed(3)}</Value>
      </Row>

      <Row>
        <Label>ATH Date</Label>
        <Value>{new Date(usd.ath_date).toLocaleDateString()}</Value>
      </Row>

      <Row>
        <Label>Market Cap</Label>
        <Value>${formatNumber(Math.round(usd.market_cap))}</Value>
      </Row>

      <Row>
        <Label>24h Volume</Label>
        <Value>${formatNumber(Math.round(usd.volume_24h))}</Value>
      </Row>

      <Row>
        <Label>Change (1h)</Label>
        <Change isUp={usd.percent_change_1h >= 0}>
          {usd.percent_change_1h.toFixed(2)}%
        </Change>
      </Row>

      <Row>
        <Label>Change (24h)</Label>
        <Change isUp={usd.percent_change_24h >= 0}>
          {usd.percent_change_24h.toFixed(2)}%
        </Change>
      </Row>

      <Row>
        <Label>Change (7d)</Label>
        <Change isUp={usd.percent_change_7d >= 0}>
          {usd.percent_change_7d.toFixed(2)}%
        </Change>
      </Row>

      <Row>
        <Label>Change (30d)</Label>
        <Change isUp={usd.percent_change_30d >= 0}>
          {usd.percent_change_30d.toFixed(2)}%
        </Change>
      </Row>

      <Row>
        <Label>Change (1y)</Label>
        <Change isUp={usd.percent_change_1y >= 0}>
          {usd.percent_change_1y.toFixed(2)}%
        </Change>
      </Row>
    </Wrapper>
  );
}
