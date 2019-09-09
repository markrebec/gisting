require 'rails_helper'

RSpec.describe CreateBlob, type: :interactor do
  describe '.call' do
    let(:gist) { create(:gist) }

    context 'without a gist' do
      subject { described_class.call(filename: 'foobar.rb', body: 'foo bar baz') }

      it 'fails' do
        expect(subject.success?).to be_falsey
      end
    end

    context 'with a gist ID' do
      subject { described_class.call(filename: 'foobar.rb', body: 'foo bar baz', gist_id: gist.id) }

      it 'succeeds' do
        expect(subject.success?).to be_truthy
      end
    end

    context 'with a gist' do
      subject { described_class.call(filename: 'foobar.rb', body: 'foo bar baz', gist: gist) }

      it 'succeeds' do
        expect(subject.success?).to be_truthy
      end
    end
  end
end
